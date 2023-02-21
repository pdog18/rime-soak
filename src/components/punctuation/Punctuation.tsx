import React, {  useState } from 'react';
import { Table, Tag } from 'antd'
import Tags from './Tags';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import type { PunctuType } from '../../store/PunctuSlice';


const Punctuation: React.FC = () => {
  const punctuArray = useSelector((state: RootState) => state.punctu)
  const columns = [
    {
      title: '符号',
      dataIndex: 'name',
      align: 'center' as const,
      width: 100,
      render: (item: any, record: PunctuType) => (<Tag style={{ width: '24px', textAlign: 'center' }}  >{record.name}</Tag>)
    },
    {
      title: '英文模式',
      width: 100,
      align: 'center' as const,
      dataIndex: 'ascii_style',
      render: (item: any, record: PunctuType) => (
        <Tag
          style={{ width: '24px', textAlign: 'center' }}
        >
          {record.ascii_style['commit'] ? record.ascii_style['commit'] : record.name}
        </Tag>)
    },
    {
      title: '中文半角',
      align: 'center' as const,
      dataIndex: 'half_shape',
      render: (item: any, record: PunctuType) => (<Tags item={item} record={record} type='half_shape' />)
    },
    {
      title: '中文全角',
      align: 'center' as const,
      dataIndex: 'full_shape',
      render: (item: any, record: PunctuType) => (<Tags item={item} record={record} type='full_shape' />)
    },
  ];

  return (<Table
    style={{ margin: '4vh 4vw' }}
    dataSource={punctuArray}
    columns={columns}
    pagination={false}
    scroll={{
      y: 360,
    }}
  />);
}

export default Punctuation;