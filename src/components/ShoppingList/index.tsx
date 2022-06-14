import React, { useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Product, ProductProps } from "../Product";
import Loading from "../Loading";

import { styles } from "./styles";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[] | undefined>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const TIME_INITIALIZED = initialized ? 500 : 2000;

  const textLoading = useMemo(() => {
    return initialized ? "Atualizando..." : "Carregando...";
  }, [initialized]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      .orderBy("description")
      .onSnapshot((snapshot) => {
        setRefreshing(true);

        if (snapshot) {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);
        }

        setTimeout(() => {
          setRefreshing(false);

          if (!initialized) {
            setInitialized(true);
          }
        }, TIME_INITIALIZED);
      });

    return () => subscribe();
  }, [TIME_INITIALIZED]);

  return refreshing ? (
    <Loading label={textLoading} />
  ) : (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
