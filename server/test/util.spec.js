const assert = require('assert');
const reqlib = require('app-root-path').require;

const util = reqlib('/src/core/utils.js');

describe('Util Function Test', () => {
	describe('금액 추출', () => {
		describe('쉼표', () => {
			it('쉼표 #1', () => {
				assert.equal(util.extractValueFromString('100,000'), 100000);
			});
			it('쉼표 #2', () => {
				assert.equal(
					util.extractValueFromString('100,000,00'),
					10000000
				);
			});
			it('쉼표 #2', () => {
				assert.equal(
					util.extractValueFromString('100,,,,000,00'),
					10000000
				);
			});
		});

		describe('소숫점', () => {
			it('소숫점 #1', () => {
				assert.equal(util.extractValueFromString('100.000'), 100);
			});
			it('소숫점 #2', () => {
				assert.equal(util.extractValueFromString('1.00000'), 1);
			});
			it('소숫점 #3', () => {
				assert.equal(util.extractValueFromString('100.78'), 100.78);
			});
			it('소숫점 #4', () => {
				assert.equal(util.extractValueFromString('100.0'), 100.0);
			});
		});

		describe('문자', () => {
			it('문자 #1', () => {
				assert.equal(util.extractValueFromString('100.000₩'), 100);
			});
			it('문자 #2', () => {
				assert.equal(util.extractValueFromString('100.000$'), 100);
			});
			it('문자 #3', () => {
				assert.equal(util.extractValueFromString('100.000₽'), 100);
			});
			it('문자 #4', () => {
				assert.equal(util.extractValueFromString('₩ 5,000'), 5000);
			});
			it('문자 #1', () => {
				assert.equal(util.extractValueFromString('₩100.000'), 100);
			});
		});

		describe('복합', () => {
			it('쉼표 + 소숫점 + 문자', () => {
				assert.equal(
					util.extractValueFromString('100,000.00₩'),
					100000
				);
			});
			it('쉼표 + 문자', () => {
				assert.equal(util.extractValueFromString('100,000₩'), 100000);
			});
			it('소숫점 + 문자', () => {
				assert.equal(util.extractValueFromString('100.000₩'), 100);
			});
		});
	});

	describe('환율 계산', () => {
		it('환율 계산 원화', async () => {
			const result = await util.convertCurrencyToWon(
				util.extractValueFromString('1000₩'),
				'KRW'
			);

			assert.equal(
				JSON.stringify(result),
				JSON.stringify({
					input: 1000,
					isoCode: 'KRW',
					rate: 1,
					result: '1,000'
				})
			);
		});

		it('환율 계산 달러', async () => {
			const result = await util.convertCurrencyToWon(1000, 'USD');

			const isSuccess =
				result.rate !== '' &&
				result.input !== '' &&
				result.isoCode !== '' &&
				result.rate !== '' &&
				result.result !== '' &&
				result.rate !== undefined &&
				result.input !== undefined &&
				result.isoCode !== undefined &&
				result.rate !== undefined &&
				result.result !== undefined;

			assert.equal(isSuccess, true);
		}).timeout(10000);
	});
});
