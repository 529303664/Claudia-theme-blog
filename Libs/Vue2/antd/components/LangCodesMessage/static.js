export const columns = [
  {
    title: '语言码',
    dataIndex: 'lang',
  },
  {
    title: '文案',
    dataIndex: 'model_text',
  },
  {
    width: '200px',
    title: '操作',
    key: 'action',
    dataIndex: '',
    scopedSlots: { customRender: 'action' },
  },
]
