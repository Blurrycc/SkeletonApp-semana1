import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiBacklogPage } from './mi-backlog.page';

describe('MiBacklogPage', () => {
  let component: MiBacklogPage;
  let fixture: ComponentFixture<MiBacklogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiBacklogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
