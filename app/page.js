"use client";
import Header from "@/components/layout/Header";
import Hero   from "@/components/sections/Hero";
import Concept from "@/components/sections/Concept";
import CanShowcase from "@/components/sections/CanShowcase";
import ScrollStory from "@/components/sections/ScrollStory";
import Footer from "@/components/layout/Footer";
import ActionModal from "@/components/ui/ActionModal";
import useActionModal from "@/hooks/useActionModal";

export default function Home() {
  const { openModal, modalTitle, showNotice, closeNotice } = useActionModal();

  return (
    <main>
      <Header onGetYours={() => showNotice("Get Yours")} />
      <Hero onShopNow={() => showNotice("Shop Now")} onWatchFilm={() => showNotice("Watch Film")} />
      <Concept />
      <CanShowcase />
      <ScrollStory />
      <Footer />
      <ActionModal open={openModal} title={modalTitle} onClose={closeNotice} />
    </main>
  );
}