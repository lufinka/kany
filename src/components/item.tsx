
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { TD } from '../types/todo.js';

@Component
export default class Item extends Vue {
  // public num: number = 0;
  // public num2: number = 0;
  @Prop(Object) public data !: TD;
  @Prop(Number) public index !: number;
  public mirror: TD = JSON.parse(JSON.stringify(this.data));
  // @Watch('num')
  // public fn() {
  //   this.num2++;
  // }
  // @Emit('say')
  // public save() {
  //   return '121';
  // }
  // get ky() {
  //   return this.num + this.num2;
  // }
  // public increment() {
  //   this.num++;
  // }
  public computedOne(): void {
    this.$http
      .post('http://localhost:7001/switchStatus', {
          id: this.mirror.id,
          computed: !!this.mirror.computed ? 0 : 1,
      })
      .then((res: any) => {
        if (res.data.code === 200) {
          this.mirror.computed = (!!this.mirror.computed ? 0 : 1);
        } else {
          this.$message({
            message: res.data.msg,
            type: 'warning',
          });
        }
      });
  }
  public render() {
    // return <h2>{this.data.desc}
    // <button on-click={this.save}>点击</button>
    // <button on-click={this.increment}>{this.ky}</button>
    // <button>{this.num}</button></h2>;
    return <div on-click={this.computedOne}>
      <p style={!!this.mirror.computed && { textDecoration: 'line-through', color: '#c0c4cc' }}>{this.mirror.desc}</p>
      <el-divider></el-divider>
    </div>;
  }
}
