import React, { Fragment, useMemo, useState } from 'react';
import style from './style.module.scss';
import { Button, Form, Input, Select, Upload, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const Information = () => {
  const [step, setStep] = useState(1);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [userDetail, setUserDetails] = useState<any>({
    name:"",
    number:"",
    email:"",
    age:"",
    gender:"",
    position:"",
    industry:"",
    location:"",
    experience:"",
    job_type:"",
  });
  const activeClass = (stp: any) => step === stp ? style.step_active : style.step;
  const onFinishPersonal = (values: any) => {
    setStep(2)
    setUserDetails({...userDetail, ...values})
    console.log({ values });
  };

  const onFinishProfessional = (values: any) => {
    setStep(3)
    setUserDetails({...userDetail, ...values})
    console.log({ values });
  };

  console.log({userDetail});
  
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <div className={style.container}>
      <div className={style.container_inner}>
        <div className={style.step_container}>
          <div className={activeClass(1)}>1</div>
          <div className={style.line}></div>
          <div className={activeClass(2)}>2</div>
          <div className={style.line}></div>
          <div className={activeClass(3)}>3</div>
        </div>
        <div className={style.credential_contaner}>
          {step === 1 &&
            <Form
              onFinish={onFinishPersonal}
              autoComplete="off"
            >
              <Fragment>
                <div className={style.input_container}>
                  <div className={style.title}>Personal Information</div>
                  <div className={style.description}>In order to access our services,
                    we need some basic personal information from you
                    to provide you with the best possible experience.</div>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                  >
                    <Input placeholder='Full Name' />
                  </Form.Item>
                  <Form.Item
                    name="number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Input placeholder='Phone Number' />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input placeholder='Country' />
                  </Form.Item>
                  <Form.Item
                    name="age"
                  >
                    <Input placeholder='Age (optional)'/>
                  </Form.Item>
                  <Form.Item
                    name="gender"
                  >
                    <Input placeholder='Gender (optional)' />
                  </Form.Item>
                  <Button htmlType="submit" className={style.btn_container}>Next</Button>
                </div>
              </Fragment>
            </Form>
          }
          {step === 2 &&
            <Form
              onFinish={onFinishProfessional}
              autoComplete="off"
            >
              <Fragment>
                <div className={style.input_container}>
                  <div className={style.title}>Professional Information</div>
                  <div className={style.description}>In order to provide relevent
                    job we need some professional information from you.</div>
                  <Form.Item
                    name="position"
                    rules={[{ required: true, message: 'Please input your position!' }]}
                  >
                    <Input placeholder='Job Title or Position' />
                  </Form.Item>
                  <Form.Item
                    name="industry"
                    rules={[{ required: true, message: 'Please input your Industry!' }]}
                  >
                    <Input placeholder='Industry' />
                  </Form.Item>
                  <Form.Item
                    name="location"
                    rules={[{ required: true, message: 'Please input your location!' }]}
                  >
                    <Input placeholder={`Location You're Interested in Working in`} />
                  </Form.Item>
                  <div className={style.type_btn_container}>
                    <Form.Item
                      name="experience"
                    >
                      <Input placeholder='Experience in Years' />
                    </Form.Item>
                    <Form.Item
                      name="job_type"
                    >
                    <Select
                      defaultValue="Remote"
                      onChange={handleChange}
                      options={[
                        { value: 'remote', label: 'Remote' },
                        { value: 'on_site', label: 'On-Site' },
                        { value: 'hybrid', label: 'Hybrid' },
                      ]}
                    />
                      </Form.Item>
                  </div>
                  <div className={style.upload_btn_container}>
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </div>
                  <Button htmlType="submit" className={style.btn_container}>Next</Button>
                </div>
              </Fragment>
            </Form>
          }
          {step === 3 &&
            <Fragment>
              <div className={style.input_container}>
                <div className={style.title}>Preview</div>
                <div className={style.description}>Please review your details and  make sure these are accurate
                and uptodate.</div>
                <div className={style.preview}>
                <div>Full Name: <span>{userDetail.name}</span></div>
                <div>Phone Number: <span>{userDetail.number}</span></div>
                <div>Email: <span>{userDetail.email}</span></div>
                <div>Age: <span>{`${userDetail.age} Years`}</span></div>
                <div>Gender: <span>{userDetail.gender}</span></div>
                <div>Position: <span>{userDetail.position}</span></div>
                <div>Industry: <span>{userDetail.industry}</span></div>
                <div>Job Location: <span>{userDetail.location}</span></div>
                <div>Experience:<span>{`${userDetail.experience} Years`}</span></div>
                <div>Job Type: <span>{userDetail.job_type}</span></div>
                </div>
                <Button className={style.btn_container} onClick={() => setStep(1)}>Next</Button>
              </div>
            </Fragment>
          }

        </div>

      </div>
    </div>
  )
}

export default Information;