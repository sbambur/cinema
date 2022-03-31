import { FC } from 'react';
import '../css/mainLayout.css'

const MainLayout: FC = ({children}) =>{
  return<main>
    {children}
  </main>
}

export default MainLayout;