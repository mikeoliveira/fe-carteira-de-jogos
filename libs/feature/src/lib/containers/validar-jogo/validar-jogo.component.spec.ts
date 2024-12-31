import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarJogoComponent } from './validar-jogo.component';

describe('ValidarJogoComponent', () => {
  let component: ValidarJogoComponent;
  let fixture: ComponentFixture<ValidarJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarJogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
