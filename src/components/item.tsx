
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import { TD } from '../types/todo.js';
@Component
export default class Item extends Vue {
  public count: number = 0;
  public show: boolean = false;
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
  public computedOne(e): void {
    e.preventDefault();
    this.count += 1;
    setTimeout(() => {
      if (this.count === 1) {
        this.switchStatus();
      } else if (this.count === 2) {
        this.show = true;
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
      this.count = 0;
    }, 300);
  }
  public switchStatus(): void {
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
  public updateDesc(): void {
    this.show = false;
    if (this.mirror.desc !== this.data.desc) {
      if (!this.mirror.desc) {
        this.mirror.desc = this.data.desc;
        this.$message({
          message: '不能为空！',
          type: 'warning',
        });
      } else {
        this.$http
          .post('http://localhost:7001/switchStatus', {
            id: this.mirror.id,
            desc: this.mirror.desc,
          })
          .then((res: any) => {
            if (res.data.code === 200) {
              this.data.desc = this.mirror.desc;
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning',
              });
            }
          });
      }
    }
  }
  public render() {
    // return <h2>{this.data.desc}
    // <button on-click={this.save}>点击</button>
    // <button on-click={this.increment}>{this.ky}</button>
    // <button>{this.num}</button></h2>;
    return <div class='item'>
      <p v-show={!this.show} on-click={this.computedOne} style={!!this.mirror.computed && { textDecoration: 'line-through', color: '#c0c4cc' }}>
        {this.mirror.desc}
      </p>
      <el-input ref='input' v-show={this.show} clearable={true} v-model={this.mirror.desc}
        on-blur={this.updateDesc}></el-input>
      <el-divider></el-divider>
    </div> ;
  }
}
