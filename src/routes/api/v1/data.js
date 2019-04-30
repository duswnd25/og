const express = require('express');

const router = express.Router();
const reqlib = require('app-root-path').require;

const userManager = reqlib('/src/db/v1/user_manager');
const purchaseManager = reqlib('/src/db/v1/purchase_manager');
const slack = reqlib('/src/core/slack');
// const util = require('./../../../core/utils');

// 차단 여부
router.get('/:userId/is_banned', async (req, res) => {
	const { userId } = req.params;
	const { agent } = req.query;
	const isBanned = await userManager.isBannedUser(userId, agent);
	return res.status(200).json({ isBanned });
});

// 아이템 전송
router.get('/:userId/receive_item', async (req, res) => {
	const { readOnly, sub, agent } = req.query;

	const sendItem = await userManager.getSendItemValue(
		req.params.userId,
		agent,
		sub,
		readOnly
	);

	return res.status(200).json({ sendItem });
});

// TODO: 유저 데이터 갱신
router.post('/:userId/update', async (req, res) => {
	const { userId } = req.params;
	const { sub, agent } = req.query;
	await userManager.uploadUserInfo(userId, sub, agent, req.body);
	return res.status(200).json({ uploadUser: 'success' });
});

// TODO: 유저 결제 로그
router.post('/:userId/purchase', async (req, res) => {
	const {
		user_id: userId,
		order_id: orderId,
		purchase_value: purchaseValue,
		iso_code: isoCode,
		agent
	} = req.query;

	const addOrderToUser = userManager.purchase(userId, orderId, agent);
	const slackMessage = slack.purchaseMessage(
		userId,
		orderId,
		purchaseValue,
		isoCode
	);
	const purchaseLog = purchaseManager.addPurchaseLog(
		purchaseValue,
		isoCode,
		agent,
		orderId
	);

	await Promise.all([addOrderToUser, slackMessage, purchaseLog]);
	return res.status(200).json({ result: '결제 완료' });
});

module.exports = router;
