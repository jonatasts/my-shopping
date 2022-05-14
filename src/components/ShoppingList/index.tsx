import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Product, ProductProps } from "../Product";
import Loading from "../Loading";

import { styles } from "./styles";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [refreshing, setRefreshing] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        setRefreshing(true);
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);

        setTimeout(() => {
          setRefreshing(false);
          if (!initialized) setInitialized(true);
        }, 2000);
      });

    return () => subscribe();
  }, []);

  return refreshing ? (
    <Loading label={initialized ? "Atualizando..." : "Carregando..."} />
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
