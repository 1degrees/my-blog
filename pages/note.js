import Head from 'next/head'
import React, { Component }from 'react'
import Router, { withRouter } from 'next/router'
import { Modal, Form, Button, Select, Input } from 'antd'
import Layout from '@components/view/Layout'
import _, { get, set } from 'lodash'
import axios from 'axios'
import qs from 'qs'

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
  onValuesChange(_, values) {},
})((props) => {
  const { getFieldDecorator } = props.form;
  props.setValidateFields(props.form);
  return (
    <Form onSubmit={this.handleSubmit} className="login-form">
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
          <Select className="article-tag" placeholder="文章分类" dropdownStyle={{ zIndex: 10002 }} onChange={this.handleChange}>
            <Option value="旅游日记">旅游日记</Option>
            <Option value="程序人生">程序人生</Option>
            <Option value="语录心得" >语录心得</Option>
          </Select>
        )}
      </FormItem>
      <FormItem style={{ display: 'inline-block', 'width' : '300px', 'margin' : '-3px 0 0 50px' ,'color': 'red' }}>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your password!' }],
        })(
          <Input className="p-password" type="password" placeholder="私人博客,输入密码"/>
        )}
      </FormItem>
    </Form>
  );
});

class Note extends Component {
  static getInitialProps ({ req }) {
    console.log('------getInitialProps--Note-----')
    return {isServer: !!req}
  }

  constructor (props) {
    console.log('------constructor--Note-----')
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
        tag: { },
        password: {  value: '' }
      }
     };
  }

  componentDidMount(){
    console.log('------componentDdMount--Note-----')
    let timer = setInterval(e => {
      console.log('------timer------');
      if(typeof wangEditor != "undefined" && !this.editor) {
        this.editor = new wangEditor('#editor');
        this.editor.create();
        clearInterval(timer);
      }
    }, 200)
  }

  setValidateFields = (val) => this.form = val
  
  submit = () => {
    this.setState({
      show: true,
      loading: true
    })
  }

  handleOk = () => {
    this.form.validateFields((err, values) => {
      if (!err) {
        let title = this.state.fields.title.value,
            tag  = this.state.fields.tag.value,
            password = this.state.fields.password.value,
            description = this.state.fields.description.value,
            time =  _.now('yyyy-MM-dd hh:mm:ss'),
            content = this.editor.txt.html();
        let article = { title, description, content, tag, time, author:"张啸", views : 0, likes : 0 };
        this.setState({ 
          show: false,
          fields: {
            title: {  value: '' },
            description: {  value: '' },
            tag: { },
            password: {  value: '' }
          } 
        });
        this.form.resetFields();
        axios.post('http://localhost:8080/articles/save', article).then( rs => {
          
        })
      }
    });
  }
  
  handleCancel = () => {
    this.form.resetFields();
    this.setState({
      show: false,
      loading: false
    })
  }

  handleFormChange = (val) => {
    this.setState( preState => {
      fields: set(preState.fields, Object.keys(val)[0], Object.values(val)[0])
    });
  }

  render() {
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
          <a href="#" className="cd-top">Top</a>
        </Layout>
    )
  }
}

export default withRouter(Note)