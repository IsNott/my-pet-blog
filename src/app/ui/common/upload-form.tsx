import React, { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { uploadFile, getFilePreView } from "@/app/lib/action";
import Image from "next/image";
import { useEffect } from "react";
import { Cross1Icon, CheckIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setImgs } from "@/redux/features/plog-img-slice";

export default function UploadImage({
  preImgs,
  userId,
}: {
  preImgs: string[] | null;
  userId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState("");
  const [uploadedFileId, setUploadedFileIds] = useState<string[]>([]);
  const [ImgUrls, setImgUrls] = useState<string[]>([]);
  const [imgDiv, setImgDiv] = useState<any[]>([]);
  const [showDelete, setShowDelete] = useState(true);

  // 捕获文件添加到文件列表
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (preImgs && preImgs.length > 0) {
      setUploadedFileIds(preImgs);
    }
  }, [userId]);

  // 监听 file 的变化
  useEffect(() => {
    if (file !== null) {
      const filedom = document.getElementById("submitUpload");
      filedom?.click();
    }
  }, [file]);

  // 监听 uploadedFileId 的变化
  useEffect(() => {
    if (uploadedFileId.length > 0) {
      dispatch(setImgs(uploadedFileId));
      handlePreView(uploadedFileId);
    }
  }, [uploadedFileId]);

  // 监听 uploadedFileId 的变化
  useEffect(() => {
    if (ImgUrls.length > 0) {
      handleImageDivShow();
    }
  }, [ImgUrls]);

  // 模拟点击选择文件按钮
  const handldWareFile = () => {
    setFile("");
    const filedom = document.getElementById("file");
    filedom?.click();
  };

  const handleDeleteClick = () => {};

  const handleMouseEnter = () => {
    setShowDelete(true);
  };

  const handleUpload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.set("file", file);
        const data = await uploadFile(formData);
        setUploadedFileIds([...uploadedFileId, data.obj.id]);
      }
    } catch (error) {
      throw error;
    }
  };

  const handlePreView = async (ids: string[]) => {
    try {
      const urls = await getFilePreView(ids);
      setImgUrls(urls);
    } catch (error) {
      throw error;
    }
  };

  const handleImageDivShow = () => {
    if (ImgUrls.length > 0) {
      const div: any[] = [];
      for (let i = 0; i <= ImgUrls.length; i++) {
        const url = ImgUrls[i];
        const id = url;
        if (url) {
          div.push(
            <div
              key={id}
              style={{
                position: "relative",
                display: "inline-block",
                padding: 10,
              }}
            >
              <Image
                width={300}
                height={300}
                key={id}
                id={String(i)}
                alt={"uploadFile" + id}
                src={ImgUrls[i]}
                quality={50}
                // onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
              />
              {showDelete && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    cursor: "pointer",
                  }}
                >
                  <Button
                    type="button"
                    color={undefined}
                    onClick={handleDeleteClick}
                  >
                    {!showDelete ? <Cross1Icon /> : <CheckIcon />}
                  </Button>
                </div>
              )}
            </div>,
          );
        }
      }
      setImgDiv(div);
    }
  };

  return (
    <Flex direction="column">
      <input
        name="file"
        id="file"
        style={{ display: "none" }}
        accept=".png,.jpg"
        type="file"
        onChange={handleFileChange}
      />
      <Flex direction="row">
        <button type="button" onClick={handldWareFile}>
          <div className="board">
            <PlusIcon height="100" width="100" />
          </div>
        </button>
        {imgDiv.length > 0 && <Flex direction="row">{imgDiv}</Flex>}
      </Flex>
      <Button
        type="button"
        id="submitUpload"
        style={{ display: "none" }}
        onClick={handleUpload}
      >
        Upload Image
      </Button>
    </Flex>
  );
}
