import Head from 'next/head';
import dynamic from 'next/dynamic';
import _, { get, set } from 'lodash';
import React, { Component }from 'react';
import Router, { withRouter } from 'next/router';
import { Modal, Form, Button, Select, Input } from 'antd';
import LoaderLib from '@utils/loaderLib';
import { saveArticle } from '../service';

const Layout = dynamic(import('@components/view/Layout'));

const { TextArea } = Input;
const { Option } = Select;
const FormItem = Form.Item;
const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({
        ...props.title,
        value: props.title.value,
      }),
      description: Form.createFormField({
        ...props.description,
        value: props.description.value,
      }),
      tag: Form.createFormField({
        ...props.tag,
        value: props.tag.value,
      }),
      password: Form.createFormField({
        ...props.password,
        value: props.password.value,
      }),
    };
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  props.setValidateFields(props.form);
  let checkPassword = (rule, value, callback) => {
    (value && value != "zhangxiao")? callback( '密码错误,亲木有编辑权限哦！') : callback()
  }
  return (
    <Form className="login-form">
      <FormItem>
        {getFieldDecorator('title', {
          rules: [{ required: true, message: 'Please input your title!' }],
        })(
          <Input className="article-title" style={{ 'fontWeight': 'bold' }} placeholder="文章标题"/>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Please input your description!' }],
        })(
          <TextArea className="article-desc" placeholder="文章描述"/>
        )}
      </FormItem>
      <FormItem style={{ display: 'inline-block', width: 120 }}>
        {getFieldDecorator('tag', {
          rules: [{ required: true, message: 'Please input your tag!' }],
        })(
          <Select className="article-tag" placeholder="文章分类" dropdownStyle={{ zIndex: 10002 }}>
            <Option value="旅游日记">旅游日记</Option>
            <Option value="程序人生">程序人生</Option>
            <Option value="语录心得" >语录心得</Option>
          </Select>
        )}
      </FormItem>
      <FormItem style={{ display: 'inline-block', 'width' : '300px', 'margin' : '-3px 0 0 50px' ,'color': 'red' }}>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码(仅限博主使用)!' }, 
                  { validator: checkPassword }],
        })(
          <Input className="p-password" type="password" placeholder="私人博客,输入密码"/>
        )}
      </FormItem>
    </Form>
  );
});

class Note extends Component {
  static getInitialProps ({ req }) {
    return {isServer: !!req}
  }

  constructor (props) {
    super(props);
    this.titleInput = React.createRef();
    this.descInput = React.createRef();
    this.passwordInput = React.createRef();
    this.state = { 
      loading: false,
      show : false,
      fields: {
        title: {  value: '' },
        description: {  value: '' },
        tag: { value: '' },
        password: {  value: '' }
      }
     };
  }

  componentDidMount(){
    LoaderLib(wangEditor).then(rs => {
      this.editor = new wangEditor('#editor');
      this.editor.create();
    })
  }

  setValidateFields = (val) => this.form = val
  
  submit = () => {
    this.setState({
      show: true,
      loading: true,
      success : false
    })
  }

  submitContent = (article) =>{
    saveArticle(article).then( rs => {
      this.setState({ link : article.link, success : true });
    })
    this.setState({ 
      show: false,
      fields: {
        title: {  value: '' },
        description: {  value: '' },
        tag: { value: '' },
        password: {  value: '' }
      } 
    });
    this.form.resetFields();
  }

  handleOk = () => {
    this.form.validateFields((err, values) => {
      if (!err) {
        let title = this.state.fields.title.value,
            link = `/article?title=${title}`,
            tag  = this.state.fields.tag.value,
            password = this.state.fields.password.value,
            description = this.state.fields.description.value,
            time =  _.now('yyyy-MM-dd hh:mm:ss'),
            content = this.editor.txt.html();
        let article = { title, link, description, content, tag, time, author:"张啸", views : 0, likes : 0 };
        if(password == 'zhangxiao'){
          this.submitContent(article);
        }
      }
    });
  }
  
  handleCancel = () => {
    this.setState({ 
      show: false,
      loading: false,
      fields: {
        title: {  value: '' },
        description: {  value: '' },
        tag: { },
        password: {  value: '' }
      } 
    });
    this.form.resetFields();
  }

  handleFormChange = (val) => {
    this.setState( preState => {
      fields: set(preState.fields, Object.keys(val)[0], Object.values(val)[0])
    });
  }

  cancel = () => {
    this.setState({ success : false})
  }
  
  render() {
    let link = this.state.link;
    return (
        <Layout>
          <Head>
            <script defer src="//unpkg.com/wangeditor/release/wangEditor.min.js"/>
            <link rel="stylesheet" href="//unpkg.com/wangeditor/release/wangEditor.min.css"/>
          </Head>
          <div className="pagebg sh"></div>
          <div className="container">
            <h1 className="t_nav"><span>像“草根”一样，紧贴着地面，低调的存在，冬去春来，枯荣无恙。</span><a href="/" className="n1">网站首页</a><a className="n2">记录每一刻</a></h1>
            <div id="editor" className="share editor"></div>
            <Button onClick={ this.submit } type="primary" loading={ this.loading }>提交</Button>
          </div>
          <Modal  title="提交验证"
                  visible={this.state.show}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}>
            <CustomizedForm {...this.state.fields } setValidateFields={ this.setValidateFields } onChange={this.handleFormChange}></CustomizedForm>
          </Modal>
          <Modal  title="提交成功" 
                  onOk={this.cancel}
                  onCancel={this.cancel}
                  visible={this.state.success}>
              <a href={ link } target="_blank">点击此处、查看文章详情</a>
          </Modal>
          <a href="#" className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(Note)