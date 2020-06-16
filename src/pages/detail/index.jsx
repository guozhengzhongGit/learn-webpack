import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import marked from 'marked'
import hljs from "highlight.js";

import 'highlight.js/styles/atom-one-dark.css';
import './markdown.less';
import { fetContent } from './api';

import { adaptContentData } from 'src/utils/tools';
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
});
const Detail = () => {

  let { id } = useParams();
  const getContent = async (id) => {
    const res = await fetContent(id)
    console.log(res);
    const contentData = adaptContentData(res);
    setContent(contentData);
  }
  useEffect(() => {
    try {
      getContent(id)
    } catch (error) {
      
    }
    
  }, [])
  const [content, setContent] = useState();
  return (
    <div className="detail-wrapper">
      {content ? <div dangerouslySetInnerHTML = {{__html: marked(content)}} className="markdown-wrapper" /> : <div>loading...</div>}
    </div>
      
    )
}

export default Detail;
