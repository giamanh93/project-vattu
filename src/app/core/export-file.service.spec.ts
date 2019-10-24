import { TestBed, inject } from '@angular/core/testing';

import { ExportFileService } from './export-file.service';

describe('ExportFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportFileService]
    });
  });

  it('should be created', inject([ExportFileService], (service: ExportFileService) => {
    expect(service).toBeTruthy();
  }));
});
