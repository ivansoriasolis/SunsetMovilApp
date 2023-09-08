import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiguiendoPage } from './siguiendo.page';

describe('SiguiendoPage', () => {
  let component: SiguiendoPage;
  let fixture: ComponentFixture<SiguiendoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SiguiendoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
