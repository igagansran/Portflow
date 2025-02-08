"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"
import { Inter, Playfair_Display } from "next/font/google"
import { useDropzone } from "react-dropzone"
import styles from "../../../styles/templates/minimal.module.css"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion, useScroll, useTransform } from "framer-motion"
import JSZip from "jszip"
import FileSaver from "file-saver"
import ReactConfetti from "react-confetti"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"] })

interface BeforeAfterGrid {
  id: string
  before1: string
  after1: string
  before2: string
  after2: string
}

interface PortfolioImage {
  src: string
  description: string
  id: string
}

export default function MinimalTemplate() {
  const [photographyName, setPhotographyName] = useState("Your Photography Name")
  const [name, setName] = useState("Your Name")
  const [skills, setSkills] = useState(["Photography", "Portrait", "Landscape", "Events"])
  const [profileImage, setProfileImage] = useState("/placeholder.svg")
  const [isEditing, setIsEditing] = useState(false)
  const [beforeAfterGrids, setBeforeAfterGrids] = useState<BeforeAfterGrid[]>([
    { id: "ba-1", before1: "", after1: "", before2: "", after2: "" },
    { id: "ba-2", before1: "", after1: "", before2: "", after2: "" },
    { id: "ba-3", before1: "", after1: "", before2: "", after2: "" },
  ])
  const [passion, setPassion] = useState("Write about your passion for photography here...")
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>(
    Array(4)
      .fill(null)
      .map((_, index) => ({ src: "", description: "", id: `p-${index + 1}` })),
  )
  const [contactEmail, setContactEmail] = useState("your.email@example.com")
  const [heroImage, setHeroImage] = useState("/placeholder.svg")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const heroTextRotateX = useTransform(scrollYProgress, [0, 1], [0, -30])
  const heroTextScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroImageRotateY = useTransform(scrollYProgress, [0, 1], [0, 30])
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  const profileTextY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const profileTextRotateY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const profileTextScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowDimensions()
    window.addEventListener("resize", updateWindowDimensions)
    return () => window.removeEventListener("resize", updateWindowDimensions)
  }, [])

  const handleImageUpload = useCallback(
    (file: File, id: string, type: "before1" | "after1" | "before2" | "after2" | "hero" | "profile" | "portfolio") => {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === "hero") {
          setHeroImage(reader.result as string)
        } else if (type === "profile") {
          setProfileImage(reader.result as string)
        } else if (["before1", "after1", "before2", "after2"].includes(type)) {
          setBeforeAfterGrids((prev) =>
            prev.map((grid) => (grid.id === id ? { ...grid, [type]: reader.result as string } : grid)),
          )
        } else if (type === "portfolio") {
          setPortfolioImages((prev) =>
            prev.map((item) => (item.id === id ? { ...item, src: reader.result as string } : item)),
          )
        }
      }
      reader.readAsDataURL(file)
    },
    [],
  )

  const { getRootProps: getHeroRootProps, getInputProps: getHeroInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "hero", "hero"),
    accept: { "image/*": [] },
    multiple: false,
  })

  const { getRootProps: getProfileRootProps, getInputProps: getProfileInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, "profile", "profile"),
    accept: { "image/*": [] },
    multiple: false,
  })

  const getPortfolioImageProps = (id: string) => ({
    ...useDropzone({
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, id, "portfolio"),
      accept: { "image/*": [] },
      multiple: false,
    }),
  })

  const getBeforeAfterImageProps = (gridId: string, type: "before1" | "after1" | "before2" | "after2") => ({
    ...useDropzone({
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, gridId, type),
      accept: { "image/*": [] },
      multiple: false,
    }),
  })

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      id: string,
      type: "before1" | "after1" | "before2" | "after2" | "hero" | "profile" | "portfolio",
    ) => {
      if (acceptedFiles.length > 0) {
        handleImageUpload(acceptedFiles[0], id, type)
      }
    },
    [handleImageUpload],
  )

  const handleSave = useCallback(() => {
    console.log("Saving portfolio:", {
      photographyName,
      name,
      skills,
      profileImage,
      beforeAfterGrids,
      passion,
      portfolioImages,
      contactEmail,
      heroImage,
    })
    setIsEditing(false)
    alert("Changes saved successfully!")
  }, [photographyName, name, skills, profileImage, beforeAfterGrids, passion, portfolioImages, contactEmail, heroImage])

  const handleDownload = useCallback(async () => {
    const zip = new JSZip()

    // Add main component file
    zip.file(
      "MinimalTemplate.tsx",
      `
import React from 'react'
import Image from 'next/image'
import styles from './minimal.module.css'

export default function MinimalTemplate() {
  return (
    <div className={styles.container}>
      <header>
        <h1>${photographyName}</h1>
      </header>
      <main>
        <section id="hero">
          <h2>Hey, There</h2>
          <Image src="${heroImage}" alt="Hero" width={400} height={300} />
        </section>
        <section id="about">
          <h2>${name}</h2>
          <ul>
            ${skills.map((skill) => `<li>${skill}</li>`).join("\n")}
          </ul>
          <Image src="${profileImage}" alt="Profile" width={300} height={400} />
        </section>
        <section id="passion">
          <h2>My Passion for Photography</h2>
          <p>${passion}</p>
        </section>
        <section id="portfolio">
          <h2>Portfolio</h2>
          ${portfolioImages
            .map(
              (image, index) => `
            <div>
              <Image src="${image.src}" alt="Portfolio ${index + 1}" width={300} height={300} />
              <p>${image.description}</p>
            </div>
          `,
            )
            .join("\n")}
        </section>
        <section id="skills">
          <h2>Editing Skills Showcase</h2>
          ${beforeAfterGrids
            .map(
              (grid, index) => `
            <div>
              <Image src="${grid.before1}" alt="Before 1 ${index + 1}" width={300} height={300} />
              <Image src="${grid.after1}" alt="After 1 ${index + 1}" width={300} height={300} />
              <Image src="${grid.before2}" alt="Before 2 ${index + 1}" width={300} height={300} />
              <Image src="${grid.after2}" alt="After 2 ${index + 1}" width={300} height={300} />
            </div>
          `,
            )
            .join("\n")}
        </section>
        <section id="contact">
          <h2>Contact Me</h2>
          <p>${contactEmail}</p>
        </section>
      </main>
    </div>
  )
}
`,
    )

    // Convert styles object to CSS string
    const cssContent = Object.entries(styles)
      .map(([key, value]) => `.${key} { ${value} }`)
      .join("\n")

    // Add CSS module file
    zip.file("minimal.module.css", cssContent)

    // Generate ZIP file
    const content = await zip.generateAsync({ type: "blob" })

    // Trigger download
    FileSaver.saveAs(content, "minimal-portfolio-template.zip")

    // Show confetti
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000) // Hide confetti after 5 seconds

    alert("Portfolio template has been downloaded as a ZIP file!")
  }, [photographyName, name, skills, heroImage, profileImage, passion, portfolioImages, beforeAfterGrids, contactEmail])

  const updatePortfolioDescription = useCallback((id: string, description: string) => {
    setPortfolioImages((prev) => prev.map((item) => (item.id === id ? { ...item, description } : item)))
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const href = link.getAttribute("href")
        if (href) {
          const target = document.querySelector(href)
          target?.scrollIntoView({ behavior: "smooth" })
        }
      })
    })
  }, [])

  return (
    <motion.div
      className={`${styles.container} ${inter.className} ${theme === "dark" ? "dark" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div className="fixed top-4 left-4 z-50 flex space-x-2">
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="bg-[#c58f73] hover:bg-[#c79d7f] text-white"
        >
          {isEditing ? "Save Changes" : "Edit Portfolio"}
        </Button>
        <Button onClick={handleDownload} className="bg-[#c58f73] hover:bg-[#c79d7f] text-white">
          Download ZIP
        </Button>
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="bg-[#c58f73] text-white p-2 rounded-full shadow-lg hover:bg-[#c79d7f] transition-colors group"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      <main className={`${styles.content} pt-20`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen" ref={heroRef}>
          <motion.div
            className="relative"
            style={{
              y: heroTextY,
              rotateX: heroTextRotateX,
              scale: heroTextScale,
            }}
          >
            <h1 className={`${playfair.className} ${styles.heading} text-8xl lg:text-9xl leading-tight hey-there-3d`}>
              Hey,
              <br />
              There
            </h1>
          </motion.div>

          <motion.div
            className="relative"
            style={{
              y: heroImageY,
              rotateY: heroImageRotateY,
              scale: heroImageScale,
            }}
          >
            <div {...getHeroRootProps()} className="relative aspect-[3/4] w-full max-w-lg mx-auto cursor-pointer">
              <input {...getHeroInputProps()} />
              <Image src={heroImage || "/placeholder.svg"} alt="Hero" fill className="object-cover rounded-lg" />
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                  Click or drag to upload hero image
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-16">
          <motion.div
            {...getProfileRootProps()}
            className="relative aspect-[3/4] w-full max-w-lg mx-auto cursor-pointer"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
          >
            <input {...getProfileInputProps()} />
            <Image src={profileImage || "/placeholder.svg"} alt="Profile" fill className="object-cover rounded-lg" />
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                Click or drag to upload profile image
              </div>
            )}
          </motion.div>

          <motion.div
            className="mt-8"
            style={{
              y: profileTextY,
              rotateY: profileTextRotateY,
              scale: profileTextScale,
            }}
          >
            <input
              type="text"
              value={photographyName}
              onChange={(e) => setPhotographyName(e.target.value)}
              readOnly={!isEditing}
              className={`${styles["specialization-input"]} text-3xl font-bold mb-4 w-full`}
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={!isEditing}
              className={`${styles["specialization-input"]} text-2xl font-semibold mb-4 w-full`}
            />
            <motion.div className="space-y-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...skills]
                      newSkills[index] = e.target.value
                      setSkills(newSkills)
                    }}
                    readOnly={!isEditing}
                    className={`${styles["specialization-input"]} w-full`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          id="passion"
          className="py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`${playfair.className} text-4xl mb-8`}>My Passion for Photography</h2>
          <Textarea
            value={passion}
            onChange={(e) => setPassion(e.target.value)}
            readOnly={!isEditing}
            className={`${styles["specialization-input"]} min-h-[200px] ${isEditing ? "border-[#c58f73]" : ""}`}
          />
        </motion.div>

        <div id="portfolio" className="py-16">
          <h2 className={`${playfair.className} text-4xl mb-8`}>Portfolio</h2>
          <div className="grid grid-cols-1 gap-8">
            {portfolioImages.map((image) => {
              const { getRootProps, getInputProps } = getPortfolioImageProps(image.id)
              return (
                <motion.div
                  key={image.id}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    {...getRootProps()}
                    className="relative aspect-[16/9] cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input {...getInputProps()} />
                    {image.src ? (
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={`Portfolio ${image.id}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                        <p className="text-gray-500">Click or drag to upload image</p>
                      </div>
                    )}
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                        Click or drag to upload image
                      </div>
                    )}
                  </motion.div>
                  <Textarea
                    value={image.description}
                    onChange={(e) => updatePortfolioDescription(image.id, e.target.value)}
                    readOnly={!isEditing}
                    placeholder="Describe the image and the story behind it..."
                    className={`${styles["specialization-input"]} min-h-[100px] ${isEditing ? "border-[#c58f73]" : ""}`}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        <div id="skills" className="py-16">
          <h2 className={`${playfair.className} text-4xl mb-8`}>
            Editing Skills Showcase - Before and After my magic touch ✨
          </h2>
          <div className="space-y-12">
            {beforeAfterGrids.map((grid) => (
              <div key={grid.id} className="grid grid-cols-2 gap-4">
                {["before1", "after1", "before2", "after2"].map((type) => {
                  const { getRootProps, getInputProps } = getBeforeAfterImageProps(
                    grid.id,
                    type as "before1" | "after1" | "before2" | "after2",
                  )
                  return (
                    <div key={type} className="relative aspect-square cursor-pointer">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {grid[type as keyof BeforeAfterGrid] ? (
                          <Image
                            src={grid[type as keyof BeforeAfterGrid] || "/placeholder.svg"}
                            alt={`${type} ${grid.id}`}
                            fill
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                            <p className="text-gray-500">Click or drag to upload {type.replace(/[12]/, "")} image</p>
                          </div>
                        )}
                        {isEditing && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                            Click or drag to upload {type.replace(/[12]/, "")} image
                          </div>
                        )}
                      </div>
                      <span
                        className={`absolute bottom-2 ${
                          type.startsWith("before") ? "left-2" : "right-2"
                        } bg-[#c58f73] text-white px-2 py-1 rounded`}
                      >
                        {type.replace(/[12]/, "").charAt(0).toUpperCase() + type.replace(/[12]/, "").slice(1)}
                      </span>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div id="contact" className="py-16">
          <h2 className={`${playfair.className} text-4xl mb-8`}>Contact Me</h2>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            readOnly={!isEditing}
            className={`${styles["specialization-input"]} text-xl mb-4`}
            placeholder="Your email address"
          />
          <motion.button
            className="bg-[#c58f73] hover:bg-[#c79d7f] text-white px-6 py-3 rounded-md transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </div>
      </main>
    </motion.div>
  )
}

