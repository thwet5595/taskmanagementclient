import { DailoguePageModule } from './dailogue-page.module';

describe('DailoguePageModule', () => {
  let dailoguePageModule: DailoguePageModule;

  beforeEach(() => {
    dailoguePageModule = new DailoguePageModule();
  });

  it('should create an instance', () => {
    expect(dailoguePageModule).toBeTruthy();
  });
});
