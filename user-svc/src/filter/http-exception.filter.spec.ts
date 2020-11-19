import { HttpExceptionFilter } from '@filter/http-exception.filter';

describe('HttpExceptionFilter', () => {
  // Filters are not bound during unit tests because they require
  // the request context for Nest to bind properly
  // (it's how Nest handles the lifecycle of the request).
  // So to test the filter it's working properly or not is to used e2e testing.
  it('Should be defined', (done) => {
    expect(new HttpExceptionFilter()).toBeDefined();
    done();
  });
});
