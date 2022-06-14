import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import storage from "@react-native-firebase/storage";

import { Container, ContainerLoading, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";
import Loading from "../../components/Loading";
import theme from "../../theme";

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState("");
  const [photoInfo, setPhotoInfo] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleShowImage = async (path: string) => {
    setShowLoading(true);

    const urlImage = await storage().ref(path).getDownloadURL();
    const info = await storage().ref(path).getMetadata();
    const timeCreated = new Date(info.timeCreated);
    const formatedDate = `${timeCreated.getDate()}/${
      timeCreated.getMonth() + 1
    }/${timeCreated.getFullYear()}`;

    setPhotoSelected(urlImage);

    setPhotoInfo(`Upload realizado em ${formatedDate}`);
    setShowLoading(false);
  };

  const handleDeleteImage = async (path: string) => {
    storage()
      .ref(path)
      .delete()
      .then(() => {
        Alert.alert("Imagem excluída com sucesso!");
        setPhotoSelected("");
        loadImages();
      })
      .catch((error) => console.log(error));
  };

  const loadImages = () => {
    storage()
      .ref("images")
      .list()
      .then((result) => {
        const files: FileProps[] = [];

        result.items.forEach((file) => {
          files.push({
            name: file.name,
            path: file.fullPath,
          });
        });

        setPhotos(files);
      });
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <Container>
      <Header title="Comprovantes" />

      {showLoading && (
        <ContainerLoading>
          <Loading color={theme.COLORS.WHITE} />
        </ContainerLoading>
      )}

      <Photo uri={photoSelected} />

      <PhotoInfo>{photoInfo}</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
        refreshing={isFetching}
        onRefresh={loadImages}
      />
    </Container>
  );
}
