import { dateFormatter } from '@utils/date-formatter.utils';

describe('dateFormatter', () => {
  it('should be defined', (done) => {
    expect(dateFormatter(new Date())).toBeDefined();
    done();
  });
  it('should be return a formatted date', (done) => {
    expect(dateFormatter(new Date(), 'dddd, d mmmm, yyyy')).toEqual(
      'Kamis, 19 November, 2020',
    );
    done();
  });
});
