import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbComponent } from './addb.component';

describe('AddbComponent', () => {
  let component: AddbComponent;
  let fixture: ComponentFixture<AddbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
