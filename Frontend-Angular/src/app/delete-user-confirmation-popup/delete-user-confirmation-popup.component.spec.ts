import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserConfirmationPopupComponent } from './delete-user-confirmation-popup.component';

describe('DeleteUserConfirmationPopupComponent', () => {
  let component: DeleteUserConfirmationPopupComponent;
  let fixture: ComponentFixture<DeleteUserConfirmationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserConfirmationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
