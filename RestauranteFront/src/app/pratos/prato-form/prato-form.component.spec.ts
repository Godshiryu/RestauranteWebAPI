import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PratoFormComponent } from './prato-form.component';

describe('PratoFormComponent', () => {
  let component: PratoFormComponent;
  let fixture: ComponentFixture<PratoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PratoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PratoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
