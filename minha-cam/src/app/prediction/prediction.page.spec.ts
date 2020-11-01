import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredictionPage } from './prediction.page';

describe('PredictionPage', () => {
  let component: PredictionPage;
  let fixture: ComponentFixture<PredictionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredictionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
