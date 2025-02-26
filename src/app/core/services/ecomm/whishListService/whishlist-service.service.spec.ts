import { TestBed } from '@angular/core/testing';

import { WhishlistServiceService } from './whishlist-service.service';

describe('WhishlistServiceService', () => {
  let service: WhishlistServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhishlistServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
