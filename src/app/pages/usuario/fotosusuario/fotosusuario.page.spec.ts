import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FotosusuarioPage } from './fotosusuario.page';

describe('FotosusuarioPage', () => {
  let component: FotosusuarioPage;
  let fixture: ComponentFixture<FotosusuarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FotosusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
