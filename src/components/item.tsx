
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { TD } from '@/types/todo';

@Component
export default class Item extends Vue {
  public num: number = 0;
  public num2: number = 0;
  @Prop(Object) public data !: TD;
  @Prop(Number) public index !: number;
  @Watch('num')
  public fn() {
    this.num2++;
  }
  @Emit('say')
  public save() {
    return '121';
  }
  get ky() {
    return this.num + this.num2;
  }
  public increment() {
    this.num++;
  }
  public render() {
    return <h2>{this.data.text}
    <button on-click={this.save}>点击</button>
    <button on-click={this.increment}>{this.ky}</button>
    <button>{this.num}</button></h2>;
  }
}
