import moment from 'moment';
import {ClassB} from './classB';

export class ClassA {
  id: number;
  fullName: string;
  birthDate: Date;
  moreData: ClassB;

  getBirthDateDay(): string {
    return moment(this.birthDate).format('dddd');
  }
}
