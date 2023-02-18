import { CheckboxOptionType } from 'antd';

export class Options implements CheckboxOptionType {
  value: string = '';
  label: string = '';
  constructor(
    label: string,
    value: string
  ) {
    this.value = value;
    this.label = label;
  }
}
