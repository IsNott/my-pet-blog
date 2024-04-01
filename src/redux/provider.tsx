'use client' // redux必须在客户端组件中访问

import { store } from './store'
import { Provider } from 'react-redux'

export default function ReduxProvider({children}: {children: React.ReactNode}) {
  // 在此创建了围绕整个项目的Redux Provider
  return <Provider store={store}>{children}</Provider>
};
