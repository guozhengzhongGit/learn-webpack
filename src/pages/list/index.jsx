import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { adaptListData } from 'src/utils/tools';
import { fetchList } from './api';
import './index.less';
const List = () => {
  useEffect(() => {
    const cacheListData = JSON.parse(localStorage.getItem('listDataCache')) || {};
    if (cacheListData.expires && cacheListData.expires > Date.now()) {
      setList(cacheListData.data);
    } else {
      getList()
    }
  }, []);
  const [list, setList] = useState([]);
  const history = useHistory();
  const getList = async () => {
    try {
      const res = await fetchList();
      console.log(res);
      const list = adaptListData(res)
      setList(() => list)
      localStorage.setItem('listDataCache', JSON.stringify({
        expires: Date.now() + 600 * 1000, // 缓存 10 min
        data: list
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const gotoDetail = (item) => {
    const param = devMode ? item.id : item.number
    history.push(`/detail/${param}`)
  }

  return (
    <div>
      <ul>
        {
          list.map(item => <li key={item.id} onClick={() => {gotoDetail(item)}}>{item.title}</li>)
        }
      </ul>
    </div>
  )
}

export default List;