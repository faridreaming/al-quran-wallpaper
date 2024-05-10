const surah = document.getElementById("surah");
const jumlahSurah = 114;

for (let i = 1; i <= jumlahSurah; i++) {
  fetch(`https://unpkg.com/quran-json@1.0.1/json/surahs/${i}.json`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const namaSurah = document.createElement("option");
      namaSurah.value = data.number;
      namaSurah.textContent = data.transliteration_en;
      surah.appendChild(namaSurah);
    })
    .catch((error) => console.log("Terjadi kesalahan", error));
}

surah.addEventListener("change", () => {
  const nomorSurah = surah.value;
  const interface = document.getElementById("interface");
  interface.innerHTML = "";

  if (nomorSurah != "-") {
    fetch(`https://unpkg.com/quran-json@1.0.1/json/surahs/${nomorSurah}.json`)
      .then((response) => response.json())
      .then((data) => {
        if (nomorSurah == 1) {
          //AL-FATIHAH
          data.verses.forEach((verse) => {
            const ayatWrapper = document.createElement("div");
            const nomor = document.createElement("div");
            const ayat = document.createElement("div");

            ayatWrapper.classList.add("ayat-wrapper");
            nomor.classList.add("nomor");
            ayat.classList.add("ayat");

            nomor.innerHTML = verse.number;
            ayat.innerHTML = verse.text;
            ayatWrapper.appendChild(ayat);
            ayat.appendChild(nomor);
            interface.appendChild(ayatWrapper);
            if (verse.number == data.verses.length) {
              ayatWrapper.style.border = "none";
            }
          });
        } else {
          const ayatWrapper = document.createElement("div");
          const nomor = document.createElement("div");
          const ayat = document.createElement("div");

          ayatWrapper.classList.add("ayat-wrapper");
          nomor.classList.add("nomor");
          ayat.classList.add("ayat");

          ayat.innerHTML = "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ";
          ayatWrapper.appendChild(ayat);
          interface.appendChild(ayatWrapper);

          data.verses.forEach((verse) => {
            const ayatWrapper = document.createElement("div");
            const nomor = document.createElement("div");
            const ayat = document.createElement("div");

            ayatWrapper.classList.add("ayat-wrapper");
            nomor.classList.add("nomor");
            ayat.classList.add("ayat");

            nomor.innerHTML = verse.number;
            ayat.innerHTML = verse.text;
            ayatWrapper.appendChild(ayat);
            ayat.appendChild(nomor);
            interface.appendChild(ayatWrapper);
            if (verse.number == data.verses.length) {
              ayatWrapper.style.border = "none";
            }
          });
        }

        const ayatWrapper = document.querySelectorAll(".ayat-wrapper");
        let ayats = [];
        const wallpaperContent = document.querySelector(".wallpaper-content");
        const bismillah = document.createElement("span");
        bismillah.textContent = "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ";

        ayatWrapper.forEach((ayat) => {
          ayat.addEventListener("click", () => {
            const nomorAyat = parseInt(ayat.querySelector(".nomor").textContent);

            if (!ayat.classList.contains("selected")) {
              ayat.classList.add("selected");
              ayats.push(nomorAyat);
            } else {
              ayat.classList.remove("selected");
              ayats = ayats.filter((nomor) => nomor !== nomorAyat);
            }

            // Hapus semua konten wallpaper-content
            wallpaperContent.innerHTML = "";

            if (nomorSurah != 1 && ayats.length > 0) {
              wallpaperContent.appendChild(bismillah);
            }

            // console.log(ayats);

            // Tambahkan elemen-elemen yang dipilih ke wallpaper-content
            // Tambahkan elemen-elemen yang dipilih ke wallpaper-content
            ayats.forEach((ayatNumber) => {
              const ayatWrapperWallpaper = document.createElement("div");
              const nomorWallpaper = document.createElement("div");
              const ayatWallpaper = document.createElement("div");

              ayatWrapperWallpaper.classList.add("ayat-wrapper-wallpaper");
              nomorWallpaper.classList.add("nomor-wallpaper");
              ayatWallpaper.classList.add("ayat-wallpaper");

              nomorWallpaper.innerHTML = ayatNumber;
              ayatWallpaper.innerHTML = data.verses[ayatNumber - 1].text;
              ayatWrapperWallpaper.appendChild(ayatWallpaper);
              ayatWallpaper.appendChild(nomorWallpaper);

              // Tambahkan kelas show untuk menerapkan transisi
              setTimeout(() => {
                ayatWrapperWallpaper.classList.add("show");
              }, 100); // Delay setiap ayat sebentar untuk efek cascading
              wallpaperContent.appendChild(ayatWrapperWallpaper);
            });
          });
        });
      });
  }
});
