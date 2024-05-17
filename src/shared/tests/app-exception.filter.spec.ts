import { Test, TestingModule } from '@nestjs/testing';
import { AppExceptionFilter } from '../app-exception.filter';
import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

describe('AppExceptionFilter', () => {
  let filter: AppExceptionFilter;
  let mockResponse: any;
  const mockArgumentsHost: ArgumentsHost = {
    switchToHttp: jest.fn().mockReturnValue({
      getResponse: () => mockResponse,
    }),
  } as unknown as ArgumentsHost;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppExceptionFilter],
    }).compile();

    filter = module.get<AppExceptionFilter>(AppExceptionFilter);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe('catch', () => {
    it('should set status and message from HttpException', () => {
      const mockHttpException = new HttpException('Test error message', HttpStatus.BAD_REQUEST);

      filter.catch(mockHttpException, mockArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Test error message',
      });
    });

    it('should set status to INTERNAL_SERVER_ERROR and message from Exception', () => {
      const mockError = new HttpException({ message: 'Test error message' }, HttpStatus.INTERNAL_SERVER_ERROR);

      filter.catch(mockError, mockArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Test error message',
      });
    });

    it('should set status to INTERNAL_SERVER_ERROR and default message if no message provided', () => {
      const mockHttpException = new Error();

      filter.catch(mockHttpException as HttpException, mockArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Internal server error',
      });
    });
  });
});
