import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { ProfessionalWorkPreviewCard } from "@/components/professional-work-card";
import {
  PortfolioCollection,
  PortfolioLayout,
  PortfolioSection,
  PortfolioSectionBody,
} from "@/components/portfolio-shell";
import ScaleLetterText from "@/components/ui/scale-letter-text";
import { getLatestBlogPosts } from "@/lib/blog";
import {
  featuredProfessionalWork,
  featuredProjects,
} from "@/lib/portfolio-content";

const editorialStackClassName =
  "grid gap-y-20 pb-14 max-md:gap-y-16 max-md:pb-10 [&>section]:mt-0";

const sectionIntroClassName =
  "flex flex-wrap items-end justify-between gap-portfolio-lg";

const sectionHeadingClassName = "grid gap-3";

const sectionTitleClassName =
  "m-0 max-w-[14ch] text-[2rem] font-[650] leading-[1.02] tracking-normal text-portfolio-primary lg:text-5xl";

const kickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

const inlineLinkClassName =
  "inline-flex items-center gap-[0.55rem] font-mono text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-primary no-underline transition-colors duration-150 ease-portfolio hover:text-portfolio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent";

const emptyStateClassName = "grid gap-portfolio-md";

const emptyStateTitleClassName =
  "m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary md:text-2xl";

const emptyStateCopyClassName =
  "m-0 text-[0.96rem] leading-[1.7] text-portfolio-secondary";

const heroImageShellClassName =
  "relative grid w-full place-items-center justify-self-stretch [--portfolio-hero-image-width:min(100%,27rem)] max-[900px]:w-[min(100%,22rem)] max-[900px]:justify-self-center max-[900px]:[--portfolio-hero-image-width:min(100%,22rem)] max-md:w-[min(72vw,18rem)] max-md:[--portfolio-hero-image-width:min(72vw,18rem)]";

const heroImageHitAreaClassName =
  "peer absolute inset-0 z-[2] m-auto aspect-[1019/917] h-auto w-[var(--portfolio-hero-image-width)] [clip-path:polygon(13%_21%,47%_0%,79%_22%,82%_36%,89%_44%,90%_68%,100%_74%,100%_92%,88%_100%,62%_100%,44%_84%,24%_86%,2%_67%,0%_43%)]";

const heroImageShadowClassName =
  "pointer-events-none absolute inset-0 m-auto aspect-[1019/917] h-auto w-[var(--portfolio-hero-image-width)] translate-y-1 scale-[0.985] bg-portfolio-primary opacity-0 transition-[opacity,transform] duration-700 ease-portfolio [-webkit-mask:url(/images/turing.png)_center/contain_no-repeat] [mask:url(/images/turing.png)_center/contain_no-repeat] peer-hover:translate-y-[0.95rem] peer-hover:scale-100 peer-hover:opacity-[0.18]";

const heroImageClassName =
  "pointer-events-none relative z-[1] block h-auto w-[var(--portfolio-hero-image-width)] transition-transform duration-700 ease-portfolio peer-hover:-translate-y-[0.7rem]";

export async function getStaticProps() {
  return {
    props: {
      latestPosts: getLatestBlogPosts(3),
    },
  };
}

export default function Home({
  latestPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PortfolioLayout
      title="rckbrcls | Portfolio"
      description="Professional work, independent projects, and writing by Erick Barcelos."
    >
      <div className={editorialStackClassName}>
        <PortfolioSection spacing="page-start">
          <div className="grid max-w-6xl grid-cols-2 items-center gap-6 p-0 max-[900px]:max-w-[56rem] max-[900px]:grid-cols-1 max-[900px]:items-start max-[900px]:justify-items-center max-md:gap-portfolio-lg">
            <div className="grid min-w-0 max-w-[56rem] justify-items-start gap-portfolio-lg max-[900px]:justify-items-center max-[900px]:text-center">
              <h1 className="m-0 max-w-[14ch] text-[2.7rem] font-bold leading-[0.94] tracking-normal text-portfolio-primary max-md:max-w-none md:text-[3.6rem] lg:text-[5rem] xl:text-[6.8rem]">
                <ScaleLetterText text="Erick Barcelos." />
              </h1>
              <p className="m-0 max-w-[26rem] text-[0.96rem] leading-[1.7] text-portfolio-secondary max-[900px]:text-center">
                Software engineer building products, experiences, and better
                tools. Lifelong learner.
              </p>
            </div>

            <div className={heroImageShellClassName}>
              <span aria-hidden="true" className={heroImageHitAreaClassName} />
              <span aria-hidden="true" className={heroImageShadowClassName} />
              <Image
                src="/images/turing.png"
                alt="Portrait illustration of Erick Barcelos"
                width={1019}
                height={917}
                priority
                sizes="(min-width: 1200px) 384px, (min-width: 901px) 32vw, (min-width: 769px) 300px, 72vw"
                className={heroImageClassName}
              />
            </div>
          </div>
        </PortfolioSection>

        {featuredProfessionalWork.length > 0 ? (
          <PortfolioSection spacing="stack-loose">
            <div className={sectionIntroClassName}>
              <div className={sectionHeadingClassName}>
                <p className={kickerClassName}>Work</p>
                <h2 className={sectionTitleClassName}>Professional.</h2>
              </div>

              <Link href="/work" className={inlineLinkClassName}>
                See all work
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <PortfolioSectionBody>
              <PortfolioCollection columns={2}>
                {featuredProfessionalWork.map((item, index) => (
                  <ProfessionalWorkPreviewCard
                    key={item.slug}
                    item={item}
                    index={index}
                  />
                ))}
              </PortfolioCollection>
            </PortfolioSectionBody>
          </PortfolioSection>
        ) : null}

        <PortfolioSection spacing="stack-loose">
          <div className={sectionIntroClassName}>
            <div className={sectionHeadingClassName}>
              <p className={kickerClassName}>Work</p>
              <h2 className={sectionTitleClassName}>Independent.</h2>
            </div>

            <Link href="/work" className={inlineLinkClassName}>
              See all work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <PortfolioSectionBody>
            <PortfolioCollection columns={2}>
              {featuredProjects.map((project, index) => (
                <FeaturedProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </PortfolioCollection>
          </PortfolioSectionBody>
        </PortfolioSection>

        <PortfolioSection spacing="stack-loose">
          <div className={sectionIntroClassName}>
            <div className={sectionHeadingClassName}>
              <p className={kickerClassName}>Blog</p>
              <h2 className={sectionTitleClassName}>Writing.</h2>
            </div>

            <Link href="/blog" className={inlineLinkClassName}>
              See all posts
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <PortfolioSectionBody>
            {latestPosts.length > 0 ? (
              <PortfolioCollection columns={1}>
                {latestPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </PortfolioCollection>
            ) : (
              <article className={emptyStateClassName}>
                <p className={kickerClassName}>No posts yet</p>
                <h3 className={emptyStateTitleClassName}>
                  The writing archive is ready.
                </h3>
                <p className={emptyStateCopyClassName}>
                  New posts will appear here as soon as they are published.
                </p>
              </article>
            )}
          </PortfolioSectionBody>
        </PortfolioSection>
      </div>
    </PortfolioLayout>
  );
}
