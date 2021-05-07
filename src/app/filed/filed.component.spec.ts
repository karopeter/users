import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiledComponent } from './filed.component';

describe('FiledComponent', () => {
  let component: FiledComponent;
  let fixture: ComponentFixture<FiledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
