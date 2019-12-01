import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs';
import { FontStyleModel } from './font-style.model';

@Injectable()
export class FontStyleDialogService {
    private shouldCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public shouldCloseDialogAsObservable: Observable<boolean> = this.shouldCloseDialog.asObservable();

    private updatedFontSettings: BehaviorSubject<FontStyleModel> = new BehaviorSubject<FontStyleModel>(null);
    public updatedFontSettingsAsObservable: Observable<FontStyleModel> = this.updatedFontSettings.asObservable();

    public closeDialog(): void {
        this.shouldCloseDialog.next(true);
    }

    public updateFontSettings(newFontSettings: FontStyleModel): void {
        this.updatedFontSettings.next(newFontSettings);
    }
}
