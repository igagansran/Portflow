import { CloudArrowUpIcon, CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline"

const features = [
  {
    name: "Drag & Drop Simplicity",
    description: "Create your portfolio effortlessly by dragging and dropping your images directly from your device.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Showcase Your Specialization",
    description: "Highlight your expertise, whether it's wedding photography, portrait editing, or landscape shots.",
    icon: UserGroupIcon,
  },
  {
    name: "Set Your Rates",
    description: "Easily display your pricing and packages to attract the right clients for your services.",
    icon: CurrencyDollarIcon,
  },
]

export default function Features() {
  return (
    <section className="py-12 bg-baby-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-cherry font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-cherry sm:text-4xl">
            Everything you need to showcase your talent
          </p>
          <p className="mt-4 max-w-2xl text-xl text-cherry-light lg:mx-auto">
            Portflow provides all the tools you need to create a stunning portfolio and attract clients.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-cherry text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-cherry">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-cherry-light">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

