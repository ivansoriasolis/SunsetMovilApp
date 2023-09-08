import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisfotosPage } from './misfotos.page';

describe('MisfotosPage', () => {
  let component: MisfotosPage;
  let fixture: ComponentFixture<MisfotosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MisfotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
