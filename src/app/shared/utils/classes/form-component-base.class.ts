import { Directive } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Directive()
export abstract class FormComponentBase {
    public abstract form: FormGroup;

    public flush(controlName: string): void {
        this.form.get(controlName)?.reset(null);
    }
}