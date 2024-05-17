import { RateLimiterMemory } from 'rate-limiter-flexible';
import { RateLimiterMiddleware } from '../rate-limiter.middleware';

describe('RateLimiterMiddleware', () => {
  let middleware: RateLimiterMiddleware;
  let mockRequest: any;
  let mockResponse: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    middleware = new RateLimiterMiddleware();

    mockRequest = { ip: '127.0.0.1' };
    mockResponse = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next if rate limiting passes', async () => {
    // Arrange
    const consumeSpy = jest.spyOn(RateLimiterMemory.prototype, 'consume').mockResolvedValueOnce(mockRequest.ip);

    // Act
    await middleware.use(mockRequest, mockResponse, mockNext);

    // Assert
    expect(consumeSpy).toHaveBeenCalledWith(mockRequest.ip);
    expect(mockNext).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.send).not.toHaveBeenCalled();
  });

  it('should return 429 status if rate limiting fails', async () => {
    // Arrange
    const consumeSpy = jest
      .spyOn(RateLimiterMemory.prototype, 'consume')
      .mockRejectedValueOnce(new Error('Rate limit exceeded'));

    // Act
    await middleware.use(mockRequest, mockResponse, mockNext);

    // Assert
    expect(consumeSpy).toHaveBeenCalledWith(mockRequest.ip);
    expect(mockNext).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(429);
    expect(mockResponse.send).toHaveBeenCalledWith('Too Many Requests');
  });
});
