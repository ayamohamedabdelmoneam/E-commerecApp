import { TestBed } from '@angular/core/testing';

import { MyhttpInterceptor } from './myHttp.interceptor';

describe('MyhttpInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [MyhttpInterceptor],
    })
  );

  it('should be created', () => {
    const interceptor: MyhttpInterceptor = TestBed.inject(MyhttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
