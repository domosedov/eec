import { NextSeoProps } from "next-seo";

export default {
  title: "Экзамен на отлично",
  titleTemplate: "%s | Экзамен на отлично",
  description: "Репетиторы Москвы и Московской области. Подготовка к ЕГЭ и ОГЭ",
  additionalMetaTags: [
    {
      name: "viewport",
      content: "initial-scale=1.0, width=device-width",
    },
    {
      name: "keywords",
      content: "Репетитор, ЕГЭ, ОГЭ",
    },
  ],
} as NextSeoProps;