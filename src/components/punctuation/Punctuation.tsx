import React, { useContext, useEffect, useState } from 'react';
import { Card, Table, TableColumnsType, Tag } from 'antd'
import { AllConfigContext } from '../../App';
import Tags from './Tags';

interface DataType {
  key: string;
  name: string;
  full_shape: any;
  half_shape: any;
  ascii_style: any
}

const Punctuation: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableColumnsType<DataType>>([{}])
  const { punctuation } = useContext(AllConfigContext)
  // console.log('basic', basic);
  // console.log('schema', schema);
  // console.log('punctuation', punctuation);

  const columns = [
    {
      title: '符号',
      dataIndex: 'name',
      key: 'name',
      align: 'center' as const,
      width: 100,
      render: (item: any) => {
        if (item == ' ') {
          item = 'space'
        }
        return <Tag style={{ fontSize: "14px" }}>{item}</Tag>
      }
    },
    {
      title: '英文模式',
      width: 100,
      align: 'center' as const,
      dataIndex: 'ascii_style',
      key: 'ascii_style',
      render: (item: any) => {
        if (item === undefined) {
          return (<Tag>{'space'}</Tag>)
        }
        if (typeof item == 'string') {
          return (<Tag>{item}</Tag>)
        }
        if (item['commit'] !== undefined) {
          return (<Tag>{item['commit']}</Tag>)
        }
      }
    },
    {
      title: '中文半角',
      align: 'center' as const,
      dataIndex: 'half_shape',
      key: 'half_shape',
      render: (item: any, record: any) => (<Tags key={item} item={item} record={record} type='half_shape' />)
    },
    {
      title: '中文全角',
      align: 'center' as const,
      dataIndex: 'full_shape',
      key: 'full_shape',
      render: (item: any, record: any) => (<Tags key={item} item={item} record={record} type='full_shape' />)
    },
  ];

  useEffect(() => {
    const data = []
    for (const key in punctuation.full_shape) {
      data.push({
        key: key,
        name: key,
        full_shape: (punctuation.full_shape as any)[key],
        half_shape: (punctuation.half_shape as any)[key],
        ascii_style: (punctuation.ascii_style as any)[key]
      })
      // console.log(`key ${key}   `,
      //   `${(punctuation.full_shape as any)[key]} `,
      //   `${(punctuation.half_shape as any)[key]}`,
      //   `${(punctuation.ascii_style as any)[key]}`);
    }
    setDataSource(data)
  }, [punctuation])


  return (
    <>

      <Table style={{ margin: '4vh 4vw' }} dataSource={dataSource} columns={columns} pagination={false} scroll={{
        y: 360,
      }} />

    </>
  );
}

export default Punctuation;