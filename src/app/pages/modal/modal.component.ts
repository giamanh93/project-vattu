import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms'
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() name;
  @Input() arrForm: any;
  @Input() form: FormGroup;
  @Input() dataEdit: any;
  @Input() content: string;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal) { }
  ngOnChanges() {

  }
  ngOnInit() {
    if (this.dataEdit) {
      this.form.patchValue(this.dataEdit);
    }
  }
  // showModal() {
  //   this.modalService.open(ModalComponent)
  // }
  onSave() {
    this.save.emit(this.form.value);
    this.activeModal.close();
  }
  delete() {
    this.submit.emit();
    this.activeModal.close();
  }
}
