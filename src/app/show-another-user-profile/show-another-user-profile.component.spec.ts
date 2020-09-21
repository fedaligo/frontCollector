import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnotherUserProfileComponent } from './show-another-user-profile.component';

describe('ShowAnotherUserProfileComponent', () => {
  let component: ShowAnotherUserProfileComponent;
  let fixture: ComponentFixture<ShowAnotherUserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAnotherUserProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAnotherUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
