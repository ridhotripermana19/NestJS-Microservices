import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  // Interceptor are not bound during unit tests because they require
  // the request context for Nest to bind properly
  // (it's how Nest handles the lifecycle of the request).
  // So to test the filter it's working properly or not is to used e2e testing.
  it('should be defined', () => {
    expect(new LoggingInterceptor()).toBeDefined();
  });
});
