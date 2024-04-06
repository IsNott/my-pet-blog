'use client'
import { Flex,Button,Text,Strong } from "@radix-ui/themes";
import { useSearchParams,useRouter } from 'next/navigation'
import { setPage } from "@/redux/features/page-slice";
import { useDispatch } from 'react-redux'
import { AppDispatch,useAppSelector } from "@/redux/store";

export default function Pagination({ pageSize, totalPage, path }: { pageSize: number, totalPage: number, path: any }) {
  const dispatch = useDispatch<AppDispatch>()
  const currentPageState:any = useAppSelector((state) => state.plogPageReducer)
  const { replace } = useRouter()
  const param = useSearchParams()
  const handleSearch = (num:any)=>{
  // 获取当前浏览器地址栏中的查询参数字符串，并添加搜索参数
  const currentParams = new URLSearchParams(window.location.search);
  const searchParam = new URLSearchParams(param)
  searchParam.set('page', num);
  searchParam.set('size', '');
  if(currentParams){
     currentParams.forEach((value, key) => {
      if (key === 'query') {
        searchParam.set('query',value);
      }
    });
    
  }
  dispatch(setPage(num))
  replace(`${path}?${searchParam.toString()}`)
  }
  const handleBtnColor = (pageNum:string)=>{    
    return currentPageState === (String(pageNum)) ? "iris" : "sky"
  }
  const pageButtons = [];
  for (let i = 1; i <= totalPage; i++) {
    pageButtons.push(
      <Button variant="surface" 
        color={handleBtnColor(String(i))}
        key={i} 
        onClick={() => handleSearch(String(i))}>{i}
      </Button>
    );
  }
  return(
    <Flex gap="3" align="center" justify="end">
      {pageButtons}
      <Text>TOTAL: <Strong>{totalPage}</Strong></Text>
    </Flex>    
  )
}


