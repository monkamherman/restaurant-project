import React from 'react'
import { Link } from 'react-router-dom'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import FlickeringGrid from "@/components/ui/flickering-grid";
import { TextAnimate } from "@/components/ui/text-animate";
// import { FootersLinks, SocialLink } from '@/core/mocks/footer.mock'

/**
 * Functional component for rendering a footer
 * @parmams
 * @returns JSX element representing the footer
 * */

const Footer: React.FC = () => {
  return (
    <footer className='w-full border-t border-t-foreground/80'>
      footer

      {/* Profile */}
      <div className="border-t border-t-foreground/40 w-full px-1 py-[3px] space-x-1 font-light text-sm flex justify-center bg-foreground/50">
        <span>Conception et Realisation par</span>

        <TooltipProvider
          delayDuration={100}
        >
          <Tooltip>
            <TooltipTrigger>
              <Link
                to={'https://www.linkedin.com/in/herman-m-b565032b1/'}
                target='_blank'
                rel="noopener noreferrer"
                className='font-normal text-primary/70 hover:text-primary/70 hover:underline duration-200 text-nowrap'
              >
               Moukam Herman
              </Link>
            </TooltipTrigger>

            <TooltipContent className='px-6 py-2 relative bg-footer border border-footer-foreground text-footer-foreground text-xs'>
              <p className='relative z-30 space-y-3 leading-4'>
                <p className="flex flex-col gap-2">
                  <span className="bg-footer w-fit">
                    <TextAnimate animation="slideLeft" by="character">
                      Hello, je suis Moukam Herman,
                    </TextAnimate>
                  </span>
                  <p className="">
                    <span className="bg-footer">
                      Je suis un <b>Developpeur Web MERN-stack </b> passioner,
                    </span>
                    <br />
                    <span className="bg-footer">
                      specializing in crafting efficient and tailored digital solutions.
                    </span>
                    <br />
                    <span className="bg-footer">
                      An expert in transforming ideas into modern applications,
                    </span>
                    <br />
                    <span className="bg-footer">
                      I combine creativity with technical precision.
                    </span>
                    <br />
                    <span className="bg-footer">
                      Always seeking innovation, I am committed to tackling
                    </span>
                    <br />
                    <span className="bg-footer">
                      digital challenges with professionalism and efficiency.
                    </span>
                  </p>
                </p>

                <p className="flex items-center gap-10">
                  <p className="bg-footer flex flex-col gap-2 leading-3 w-fit">
                    <span>je suis disposer a vous repondre</span>
                    <span>contacter moi</span>
                  </p>

                  {/* Contact Informations */}
                  <div className="leading-4">
                    <p className="bg-footer w-fit">
                      Linkedin:
                      <Link
                        to={'https://www.linkedin.com/in/herman-m-b565032b1/'}
                        target='_blank'
                        className='font-medium text-primary/85 hover:text-primary duration-200 text-nowrap'
                      >
                        <TextAnimate animation="blurIn" className='inline ml-2'>
                          Mon profile LinkedIn 
                        </TextAnimate>
                      </Link>
                    </p>

                    <p className="bg-footer w-fit">
                      Whatsapp:
                      <Link
                        to={'https://wa.me/237658852731?text=bonjour%20Moukam%20Herman%20dev'}
                        target='_blank'
                        rel="noopener noreferrer"
                        className='font-medium text-primary/85 hover:text-primary duration-200 text-nowrap'
                      >
                        <TextAnimate animation="blurIn" by="character" className='inline ml-2'>
                          +237 658 852 731
                        </TextAnimate>
                      </Link>
                    </p>
                  </div>
                </p>
              </p>

              <FlickeringGrid
                className="z-0 absolute inset-0 size-full"
                squareSize={4}
                gridGap={6}
                color="#2f22f2"
                maxOpacity={0.3}
                flickerChance={0.8}
                height={800}
                width={800}
              />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  )
}

export default Footer
