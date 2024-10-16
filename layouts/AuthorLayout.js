import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'

export default function AuthorLayout({ children, frontMatter }) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = frontMatter

  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div>
        <div className="hidden print:block">
          <h1 className="mb-4 text-4xl font-bold">Julian Inwood</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-bold">Job Title:</p>
              <p className="mb-2">Full stack developer</p>

              <p className="font-bold">Company:</p>
              <p className="mb-2">Cuckoo Internet</p>
              <p className="font-bold">Current Location:</p>
              <p className="mb-2">Bristol, UK</p>
            </div>

            <div>
              <p className="font-bold">Email:</p>
              <p className="mb-2">jinw@protonmail.com</p>

              <p className="font-bold">Website:</p>
              <p className="mb-2">jinwood.github.io</p>

              <p className="font-bold">Key Skills:</p>
              <p>JavaScript, TypeScript, Node.js, React.js, Next.js, AWS</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5 print:hidden">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
          <hr className="my-4 border-gray-200 dark:border-gray-700" />
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="print-none flex flex-col items-center pt-8">
            <Image
              src={avatar}
              alt="avatar"
              width="192px"
              height="192px"
              className="h-48 w-48 rounded-full print:hidden"
            />
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6 print:hidden">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
            </div>
          </div>
          <div className="print-full-width prose max-w-none pb-8 pt-8 dark:prose-dark xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
