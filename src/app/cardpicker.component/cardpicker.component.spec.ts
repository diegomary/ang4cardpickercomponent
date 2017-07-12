import { TestBed, async } from '@angular/core/testing';
import { CardPickerComponent } from './cardpicker.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CardPickerComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(CardPickerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(CardPickerComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('cp');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(CardPickerComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to cp!!');
  }));
});
